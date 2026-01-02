import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../src/components/layout/UserOptions/UserOptions.module.scss";
import { UserContext } from "../src/contexts/userContext";
import { usersService } from "../src/services/usersService";
import { httpClientProvider } from "../src/providers/HttpClientProvider";

export default function UserSettings() {
  const router = useRouter();
  const { userInfo } = useContext(UserContext);
  const [form, setForm] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setForm((prev) => ({ ...prev, name: userInfo.name, email: userInfo.email }));
    }
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo) {
      setError("Usuário não encontrado.");
      return;
    }
    if (form.password && form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const updateData: any = { name: form.name, email: form.email };
      if (form.password) updateData.password = form.password;
      const res = await usersService.updateUser(userInfo._id, updateData, httpClientProvider);
      if (res.statusCode === 200 && res.data?.item) {
        await usersService.saveUser(res.data.item);
        alert("Dados atualizados com sucesso!");
        router.back();
      } else {
        setError(res.data?.message || "Erro ao atualizar usuário");
      }
    } catch (err: any) {
      setError(err?.message || "Erro ao atualizar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.userConfigContainer}>
      <h2 className={style.userConfigTitle}>Configurações do Usuário</h2>
      <form onSubmit={handleSubmit} className={style.userConfigForm}>
        <div className={style.userConfigAvatarBox}>
          <div className={style.userConfigAvatar}>{userInfo?.name?.[0] || "U"}</div>
          <div>
            <div className={style.userConfigName}>{userInfo?.name || "Usuário"}</div>
            <div className={style.userConfigEmail}>{userInfo?.email || "---"}</div>
          </div>
        </div>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>
        <label>
          Nova Senha:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </label>
        <label>
          Confirmar Nova Senha:
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </label>
        {error && <p className={style.error}>{error}</p>}
        <div className={style.userConfigActions}>
          <button type="submit" disabled={loading}>
            Salvar
          </button>
          <button type="button" onClick={() => router.back()}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
