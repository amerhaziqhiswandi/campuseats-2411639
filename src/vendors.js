const vendors = [
    {
        id: 'nasi-beriani-gam-power',
        name: 'Nasi Beriani Gam Power',
        location: 'Bandar Penggaram, Batu Pahat, Johor',
        openHours: '10:00 am - 10:00 pm',
        isOpen: true,
        menu: [
            {id: 'nb-1', name: 'Nasi Beriani Ayam', description: 'golden-orange Basmathi rice, tender saucy spiced chicken, infused with aromatic spices, and a side of acar', price: 10.99, category: 'Rice', available: true},
            {id: 'nb-2', name: 'Nasi Beriani Daging', description: 'golden-orange Basmathi rice, tender saucy spiced beef, infused with aromatic spices, and a side of acar', price: 11.99, category: 'Rice', available: true},
            {id: 'nb-3', name: 'Nasi Beriani Kambing', description: 'golden-orange Basmathi rice, tender saucy spiced lamb, infused with aromatic spices, and a side of acar', price: 12.99, category: 'Rice', available: false}
        ],
    },
    {
        id: 'asam-pedas-fisherman',
        name: 'Asam Pedas Fisherman',
        location: 'Parit Raja, Batu Pahat, Johor',
        openHours: '11:00 am - 4:00 pm',
        isOpen: true,
        menu: [
            {id: 'ap-1', name: 'Set Pari', description: 'A delicious set of stingray asam pedas with rice', price: 14.99, category: 'Set', available: true},
            {id: 'ap-2', name: 'Set Merah', description: 'A delicious set of red snapper asam pedas with rice', price: 12.99, category: 'Set', available: true}
        ],
    },
]

export default vendors