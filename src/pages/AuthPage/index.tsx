import { useState } from "react";
import { Container } from "@/components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store";
import CloseEye from "../../images/close-eye.svg";
import Eye from "../../images/eye.svg";

const AuthPage = () => {
  const navigate = useNavigate();

  const userLogin = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (!login.trim()) {
      return toast.warning("Введите логин");
    }

    if (!password.trim()) {
      return toast.warning("Введите пароль");
    }

    try {
      setLoading(true);

      const res = await userLogin(login, password);

      if (!res) {
        throw Error();
      }
      localStorage.setItem("pultik-user-login", login);
      localStorage.setItem("pultik-token-key", res);

      navigate("/");
    } catch (error) {
      toast.error("Не удалось войти");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="w-full flex flex-col">
        <form
          onSubmit={submitHandler}
          className="px-[10px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full flex items-center justify-center flex-col self-center"
        >
          <div className="max-w-[500px] w-full md:w-[500px]">
            <h1 className="font-bold text-center text-4xl font-sans">
              pultik.me
            </h1>
            <p className="text-center text-2xl font-sans mt-[10px]">
              Система управления маркетплейсами
            </p>
            <div className="flex flex-col gap-[10px] my-[20px]">
              <input
                type="text"
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="mt- py-[16px] px-[20px] rounded-3xl text-xl outline-none"
              />
              <div className="password">
                <input
                  type={showPassword?"text":"password"}
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-0 py-[16px] px-[20px] rounded-3xl text-xl outline-none password_input"
                />

                {!showPassword && (
                  <div className="close_eye" onClick={()=>setShowPassword(!showPassword)}>
                    <img src={CloseEye} alt="" />
                  </div>
                )}
                {showPassword && (
                  <div className="eye" onClick={()=>setShowPassword(!showPassword)}>
                    <img src={Eye} alt="" />
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="btn !rounded-3xl !text-xl !py-[20px] !h-auto"
              disabled={loading}
            >
              Войти
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-auto gap-[20px]">
          <div className="w-[70px]">
            <img src="/yandex-market-logo.png" alt="yandex-market-logo" />
          </div>
          <div className="w-[70px]">
            <img src="/ozon-logo.png" alt="ozon-logo" />
          </div>
          <div className="w-[70px]">
            <img src="/wb-logo.png" alt="wb-logo" />
          </div>
          <div className="w-[70px]">
            <img
              className="rounded-md"
              src="/avito-logo.jpg"
              alt="avito-logo"
            />
          </div>
          <div className="w-[70px]">
            <img src="/megamarket-logo.png" alt="megamarket-logo" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AuthPage;
