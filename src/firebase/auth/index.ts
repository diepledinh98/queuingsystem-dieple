import { ILoginDTO } from "@modules/authentication/repository";
import { FirebaseConfig } from "../configs"

function AuthenticationRepositoriesImpl() {
    const auth = FirebaseConfig.getInstance().auth;

    interface IParamsFirebaseAuth {
        asyncFunction: (...params: any[]) => Promise<any>,
        payload?: ILoginDTO
    }


    const execute = (
        {
            asyncFunction = () => {
                return new Promise<any>((resolve, reject) => {
                    resolve("Khong co ham nao duoc truyen vao");
                });
            },
            payload
        }: IParamsFirebaseAuth
    ) => {
        let args: any[] = []
        if (payload !== undefined)
            args = Object.values(payload);
        return asyncFunction?.(auth, ...args)
    }



    // const execute = (asyncFunction: (...params: any[]) => Promise<any>, params: ILoginDTO) => {
    //     let args: any = Object.values(params);
    //     return asyncFunction?.(auth, ...args);
    // };



    return {
        execute
    }
}

export const fbRepositorires = AuthenticationRepositoriesImpl()