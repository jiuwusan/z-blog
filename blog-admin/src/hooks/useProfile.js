import { configApi } from '@/api';
import useGlobalState from '@jws/hooks/useGlobalState';
export default () => {
    let [config, setConfig] = useGlobalState("SYS_PROFILE");

    const init = async () => {
        let result = await configApi.profileById({ uid: "fb57a600-eace-11eb-96b5-e73f4408ddb8" });
        result.profile && (result.profile = JSON.parse(result.profile));
        setConfig(result?.profile || {});
    };

    return [config, init]
};
