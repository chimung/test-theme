import "grapesJs/css/grapes.min.css";
import grapesjs from "grapesJs";

const inputComp = (editor) =>
  editor.DomComponents.addType("input", {
    // Make the editor understand when to bind `my-input-type`
    isComponent: (el) => el.tagName === "INPUT",

    // Model definition
    model: {
      // Default properties
      defaults: {
        tagName: "input",
        draggable: true,
        droppable: false, // Can't drop other elements inside
        attributes: {
          // Default attributes
          type: "text",
          name: "default-name",
          placeholder: "Insert text here"
        }
        // traits: ["name", "placeholder", { type: "checkbox", name: "required" }],
      }
    }
  });

// Add defination for custom component
const myNewComponentTypes = (editor) => {
  editor.DomComponents.addType("input-placeholder", {
    // Make the editor understand when to bind `my-input-type`
    isComponent: (el) => el.tagName === "INPUT",

    // Model definition
    model: {
      // Default properties
      defaults: {
        tagName: "div",
        draggable: "div", // Can be dropped only inside `form` elements
        droppable: false, // Can't drop other elements inside
        // attributes: {
        //   // Default attributes
        //   type: "text",
        //   name: "default-name",
        //   placeholder: "Insert text here"
        // },
        // traits: ["name", "placeholder", { type: "checkbox", name: "required" }],
        components: "<input></input>"
      }
    },
    view: {
      events: {
        dblclick: "onTest"
      },
      onTest: function () {
        debugger;
        const btn = document.createElement("button");
        btn.value = "+";
        // This is just an example, AVOID adding events on inner elements,
        // use `events` for these cases
        btn.addEventListener("click", () => {});
        console.log(this.el);
        this.el.ap(btn);
      }
    }
  });
};

const editor = grapesjs.init({
  // Indicate where to init the editor. You can also pass an HTMLElement
  container: "#gjs",
  // Get the content for the canvas directly from the element
  // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
  fromElement: true,
  // Size of the editor
  height: "300px",
  width: "auto",
  // Disable the storage manager for the moment
  storageManager: false,
  // Avoid any default panel
  panels: { defaults: [] },
  blockManager: {
    appendTo: "#blocks",
    blocks: [
      {
        id: "section", // id is mandatory
        label: "<b>Section</b>", // You can use HTML/SVG inside labels
        attributes: { class: "gjs-block-section" },
        content: `<section>
          <h1>This is a simple title</h1>
          <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`
      },
      {
        id: "text",
        label: "Text",
        content: '<div data-gjs-type="text">Insert your text here</div>'
      },
      {
        id: "image",
        label: "Image",
        // Select the component once it's dropped
        select: true,
        // You can pass components as a JSON instead of a simple HTML string,
        // in this case we also use a defined component type `image`
        content: { type: "image" },
        // This triggers `active` event on dropped components and the `image`
        // reacts by opening the AssetManager
        activate: true
      },
      {
        id: "my-input-type-id",
        label: "My input",
        content: { type: "input-placeholder" },
        activate: true
      },
      {
        id: "input",
        label: "Input Text",
        content: { type: "input" },
        activate: true
      }
    ]
  },
  plugins: [myNewComponentTypes, inputComp]
});

// Add component
// const component = editor.addComponents(`
//   <span>This is test</span>
// `)[0];

// console.log(component.get("type"));
// console.log(component.toHTML());
// console.log(JSON.stringify(component));
