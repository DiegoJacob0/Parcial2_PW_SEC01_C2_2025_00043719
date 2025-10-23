const cuentas = require('../data/cuentas');


// Obtener todas las cuentas
const getAllCuentas = (req, res) => {
    res.json({
        count: cuentas.length,
        data: cuentas
    });
};


// Obtener cuenta por ID
const getCuentaById = (req, res) => {
    const id = req.params.id;
    const cuenta = cuentas.find(c => c._id === id);

    if (cuenta) {
        res.json({
            finded: true,
            account: cuenta
        });
    } else {
        res.json({
            finded: false
        });
    }
};


// Buscar cuentas con queryParam
const searchCuentas = (req, res) => {
    const query = req.query.queryParam;
    if (!query) return res.json({ finded: false });

    const queryLower = query.toLowerCase();

    const resultados = cuentas.filter(cuenta =>
        cuenta._id.toLowerCase().includes(queryLower) ||
        cuenta.client.toLowerCase().includes(queryLower) ||
        cuenta.gender.toLowerCase() === queryLower
    );

    if (resultados.length === 1) {
        return res.json({ finded: true, account: resultados[0] });
    } else if (resultados.length > 1) {
        return res.json({ finded: true, data: resultados });
    } else {
        return res.json({ finded: false });
    }
};



// Cuentas Balances
const getCuentasBalance = (req, res) => {
    const cuentasActivas = cuentas.filter(cuenta => cuenta.isActive);

    if (cuentasActivas.length === 0) {
        return res.json({
            status: false,
            accountBalance: 0
        });
    }

    const total = cuentasActivas.reduce((acum, cuenta) => {
        const balanceNumerico = parseFloat(cuenta.balance.replace('$', '').replace(',', ''));
        return acum + balanceNumerico;
    }, 0);

    res.json({
        status: true,
        accountBalance: total
    });
};



module.exports = {
    getAllCuentas,
    getCuentaById,
    searchCuentas,
    getCuentasBalance
};
