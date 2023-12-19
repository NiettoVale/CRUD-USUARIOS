import styles from "./Login.module.css";
import LogoMuni from "../../assets/Logo.png";
import Image from "../../assets/Image.png";

function Login() {
  return (
    <main className={styles.mainLogin}>
      <section className={styles.sectionImg}>
        <img
          src={Image}
          alt="Imagen del dispensario de salsipuedes."
          className={styles.imgFondo}
        />
      </section>

      <section className={styles.sectionLogin}>
        <div>
          <section className={styles.images}>
            <img
              src={LogoMuni}
              alt="Logo de la municipalidad de salsipuedes."
            />
          </section>

          <section className={styles.loginLines}>
            <h1>INICIAR SESION</h1>
            <div className={styles.line}>
              <div className={styles.lineUnder}></div>
            </div>
          </section>

          <section className={styles.sectionForm}>
            <label htmlFor="">USUARIO: </label>
            <input type="text" />

            <label htmlFor="">CONTRASEÑA: </label>
            <input type="text" />

            <button>Ingresar</button>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Login;
