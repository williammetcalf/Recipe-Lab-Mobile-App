import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

function useOnNavigate(cb: () => void, deps: React.DependencyList = []) {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("state", cb);

    return () => navigation.removeListener("state", cb);
  }, [navigation, cb, ...deps]);
}

export default useOnNavigate;
