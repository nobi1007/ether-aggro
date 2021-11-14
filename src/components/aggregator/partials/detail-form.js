import { useRef, useState } from "react";
import { Button, Form, Schema } from "rsuite";

export const initialFormValues = {
    infuraProjectId: "b0a57dabfc404c608417aba317431782",
    address: "0xab5801a7d398351b8be11c439e05c5b3259aec9b",
    blockNumber: "13531938",
};

const { StringType } = Schema.Types;

const model = Schema.Model({
    infuraProjectId: StringType().isRequired("Infura Project Key is Required."),
    address: StringType().isRequired("Address field is required."),
    blockNumber: StringType().isRequired("Block number is required"),
});

export default function DetailForm({ onFormSubmit }) {
    const [localFormValues, setLocalFormValues] = useState(initialFormValues);
    const formRef = useRef();
    return (
        <Form
            ref={formRef}
            formValue={localFormValues}
            onChange={(currentFormValue) =>
                setLocalFormValues(currentFormValue)
            }
            model={model}
        >
            <Form.Group controlId="infuraProjectId">
                <Form.ControlLabel>Infura Project Key</Form.ControlLabel>
                <Form.Control name="infuraProjectId" />
                <Form.HelpText tooltip>
                    Infura Project Key is Required
                </Form.HelpText>
            </Form.Group>
            <Form.Group controlId="address">
                <Form.ControlLabel>Address</Form.ControlLabel>
                <Form.Control
                    required
                    aria-required
                    name="address"
                    type="text"
                />
                <Form.HelpText tooltip>Address is required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="blockNumber">
                <Form.ControlLabel>Block Number</Form.ControlLabel>
                <Form.Control
                    required
                    aria-required
                    name="blockNumber"
                    type="text"
                />
                <Form.HelpText tooltip>Block Number is required</Form.HelpText>
            </Form.Group>
            <Button
                type="submit"
                appearance="primary"
                onClick={() => {
                    if (formRef.current.check()) {
                        onFormSubmit(localFormValues);
                    }
                }}
            >
                Submit
            </Button>
        </Form>
    );
}
