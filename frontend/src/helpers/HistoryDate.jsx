import React from 'react'

const HistoryDate = ({ date }) => {
    const tarih = new Date(date);
    const ayAdlari = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const ayIsim = ayAdlari[tarih.getMonth()];
    const gun = tarih.getDate();
    const yeniFormat = ayIsim + " " + gun + ", " + tarih.getFullYear();

    return (
        <p>{yeniFormat}</p>
    )
}

export default HistoryDate