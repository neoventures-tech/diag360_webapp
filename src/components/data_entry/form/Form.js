import React from 'react';
import {Form as FormAnt} from 'antd';


function Form({children,  ...props}) {

    return (
        <FormAnt  load  scrollToFirstError
                  // onFinishFailed={() => ToastNotification(t("Some fields are required"),'error')}
                  preserve layout="vertical" {...props}>
            {children}
        </FormAnt>
    );
}

Form.Item = FormAnt.Item;
Form.useForm = FormAnt.useForm
Form.useWatch = FormAnt.useWatch
Form.useFormInstance = FormAnt.useFormInstance

export default Form;

