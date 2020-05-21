import { createContext } from "react";
import { IUserAuth } from "../../IUserAuth";

const CurrentUserContext = createContext<IUserAuth | null>(null);

export default CurrentUserContext;
