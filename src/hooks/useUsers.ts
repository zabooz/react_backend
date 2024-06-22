import { useEffect, useState } from "react";
import userService, { User } from "../services/userService";
import { CanceledError } from "axios";

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      
      setLoading(true);
      const {request,cancel} = userService.getAll<User>()
  
        request
        .then((res) => {
          setLoading(false);
          setUsers(res.data);
        })
        .catch((error) => {
          if (error instanceof CanceledError) return;
          setError(error.message);
          setLoading(false);
        });
  
      return () => {
        cancel()
        setError("");
      };
    }, []);

    return{
        users,error,isLoading,setUsers,setError
    }

}


export default useUsers