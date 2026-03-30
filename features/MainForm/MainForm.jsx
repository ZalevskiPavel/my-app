import styles from "./main-form-styles.module.css";
import { Bellefair, Montserrat } from "next/font/google";

const bellefair = Bellefair({
    subsets: ["latin"],
    weight: "400",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: "400",
});


export default function MainForm() {
  return (
    <div className={styles.formContainer}>
      <h2 className={bellefair.className}>ADD PROJECT</h2>

      <form className={bellefair.className} >
        <div className={styles.formGroup}>
          <label>ID</label>
          <input type="text" name="id" required className={montserrat.className}/>
        </div>

        <div className={styles.formGroup}>
          <label>Nume</label>
          <input type="text" name="nume" required className={montserrat.className}/>
        </div>

        <div className={styles.formGroup}>
          <label>Descriere</label>
          <textarea name="descriere" className={montserrat.className}></textarea>
        </div>

        <div className={styles.formGroup}>
          <label>Status</label>
          <select name="status" className={montserrat.className}>
            <option value="nou">Nou</option>
            <option value="in_progres">In Progress</option>
            <option value="finalizat">Finalizat</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Deadline</label>
          <input type="date" name="deadline" required className={montserrat.className}/>
        </div>

        <button type="submit" className={styles.btn}>
          Salvează
        </button>
      </form>
    </div>
  );
}

