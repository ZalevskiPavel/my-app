import { Bellefair, Montserrat } from "next/font/google";
import styles from "./note-style.module.css";

const bellefair = Bellefair({
    subsets: ["latin"],
    weight: "400",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: "400",
});


export default function Note({proiect, onClickEdit, onClickDelete}) {
    return (
        <tr className={bellefair.className}>
            <td>{proiect.id}</td>
            <td>{proiect.nume}</td>
            <td>{proiect.status}</td>
            <td>{proiect.descriere}</td>
            <td>{proiect.deadline}</td>
            <td className={styles.actions}>
                <button onClick={onClickEdit} className={montserrat.className}>Edit</button>
                <button onClick={onClickDelete} className={montserrat.className}>Delete</button>
            </td>
        </tr>
    );
}