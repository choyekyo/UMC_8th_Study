import { ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
    initialValue: T;
    // 값이 올바른지 검증하는 함수 
    validate: (values: T) => Record<keyof T, string>; 
}

function useForm<T>({initialValue, validate}: UseFormProps<T>) {
    const [values, setValues] = useState(initialValue); 
    const [touched, setTouched] = useState<Record<string, boolean>>();
    const [errors, setErrors] = useState<Record<string, string>>(); 

    // 사용자가 입력값을 바꿀 때 실행되는 함수 
    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values, // 불변성 유지, 기존 입력 값 유지 
            [name]: text, 
        });
    };

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true, 
        });
    }; 

    // 이메일 input, 패스워드 input, 속성들을 좀 가져오는 것 
    const getInputProps = (name: keyof T) => {
        const value:T[keyof T] = values[name];

        const onChange = (e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>,   
        ) => handleChange(name, e.target.value);

        const onBlur = () => handleBlur(name);
        
        return {value, onChange, onBlur}; 
    };

    // values가 변경될 때마다 에러 검증 로직 발생 
    useEffect(() => {
        const newErrors = validate(values); 
        setErrors(newErrors); // 오류 메시지 업뎃 
    }, [validate, values]);

    return { values, errors, touched, getInputProps}; 
}

export default useForm; 