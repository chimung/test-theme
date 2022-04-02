export default (editor) =>
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