import * as yup from "yup";

export const employeeSchema = yup.object({
    firstName: yup.string().required("نام الزامی است"),

    lastName: yup.string().required("نام خانوادگی الزامی است"),

    email: yup.string().required("ایمیل الزامی است").email("ایمیل معتبر نیست"),

    dateOfBirth: yup
        .date()
        .typeError("تاریخ تولد معتبر نیست")
        .max(new Date(), "تاریخ تولد نمی‌تواند در آینده باشد")
        .required("تاریخ تولد الزامی است"),

    family: yup
        .array()
        .of(
            yup.object({
                name: yup.string().trim().required("نام عضو خانواده الزامی است"),

                relation: yup.mixed<"spouse" | "daughter" | "son">().oneOf(["spouse", "daughter", "son"], "نسبت نامعتبر است").required("نسبت الزامی است"),

                dateOfBirth: yup.date().typeError("تاریخ معتبر نیست").max(new Date(), "تاریخ تولد نمی‌تواند در آینده باشد").required("تاریخ تولد الزامی است"),
            })
        )
        .nullable()
});
