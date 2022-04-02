export default (editor) => {
    editor.DomComponents.addType("test-comp", {
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
}