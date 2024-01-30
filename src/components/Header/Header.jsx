import { Container } from "../Container/Container";
import { Auth } from "./Auth/Auth";
import s from "./Header.module.scss";
import { Logo } from "./Logo/Logo";
import { SearchForm } from "./SearchForm/SearchForm";

export const Header = () => (
  <header className={s.header} id="header">
    <Container className={s.container}>
      <Logo />
      <SearchForm />
      <Auth />
    </Container>
  </header>
);
