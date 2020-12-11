import { Expose } from "biss-core";
import Dto from "@/dto/dto";

class Login extends Dto {

    @Expose({ defaultValue: null })
    public username: string | null = null;

    @Expose({ defaultValue: null })
    public password: string | null = null;

}

export default Login;
