import check from "../images/check.png"
import cancel from "../images/cancel.png"
import both from "../images/Frame.png"


export const income = [
    {
        name: 'Sugeng No Pants',
        address: 'Cileungsi',
        products: ' Paket Geprek, Paket Mie',
        status: 'Not Approved yet',
        follup: '',
        className: 'text-warning',
    },
    {
        name: 'Haris Gams',
        address: 'Sarang',
        products: ' Paket Geprek, Paket Mie',
        status: 'Succeeded',
        follup: check,
        className: 'text-success'
    },
    {
        name: 'Aziz Union',
        address: 'Bekasi',
        products: ' Paket Geprek, Paket Mie',
        status: 'Cancelled',
        follup: cancel,
        className: 'text-danger'
    },
    {
        name: 'Lae Tanjung Balai',
        address: 'Tanjung Balai',
        products: ' Paket Geprek, Paket Mie',
        status: 'On The Way',
        follup: check,
        className: 'text-primary'
    },
]