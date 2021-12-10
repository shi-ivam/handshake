const stripe = require('stripe')('sk_test_F2XOGY9UWjwyLYkF4OohylLd00q07mKaat');
const express = require('express');
const cors = require('cors');
const { sequelize, Invoices } = require('./models');
const bodyParser = require('body-parser');
const uuid = require('uuid');



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(cors({
    origin: '*'
}));


async function paymentIntent() {
    return await stripe.paymentIntents.create({
        shipping: {
            name: "Donkey Kong",
            address: {
                postal_code: 211001
            }
        },
        amount: 200000,
        currency: 'inr',
        payment_method_types: ['card'],
    });

}


app.get('/', (req, res) => {
    paymentIntent().then((payment) => {
        res.send(payment);
        console.log("Done")
    }).catch(err => console.log)

})

app.post('/complete-payment', (req, res) => {
    const { id } = req.body;

    // Save Payment id
    // Just Going to Change the Status to Complete for now

    Invoices.update({ status: "completed" }, { where: { "id": id } })
        .then(() => { res.send({ type: 'success' }) })
        .catch(err => {
            console.log(err);
            res.send({ type: 'failed' })
        })
})


app.get('/invoice/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    Invoices.findOne({ where: { "id": id, "status": 'pending' } })
        .then((invoice) => {
            if (invoice) {

                res.send({ type: 'success', invoice })
            }
            else {

                res.send({ type: 'failed', invoice })
            }
        })
        .catch(err => res.send(err))
})

app.post('/create', async (req, res) => {

    const { title, creator, dueDate, billingAddress, items, total, description } = req.body;
    try {

        function calculateTotalFromItemsArray(array) {
            let total = 0;
            for (let i = 0; i < array.length; i++) {
                total += Number(array[i]["price"]) * Number(array[i]["quantity"]);
            }
            return total
        }
        const invoice = await Invoices.create({ title, creator, dueDate, billingAddress, creator, items, dueDate, total: calculateTotalFromItemsArray(items), description, id: uuid.v4() });

        return res.json({ title, creator, dueDate, billingAddress, items, total, description, type: 'success' });
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

app.post('/delete', async (req, res) => {
    const { id } = req.body;
    await Invoices.destroy({ where: { id: id } })
})

app.post('/update', (req, res) => {

    console.log('update req')
    const { type, id } = req.body;
    console.log({ type, id })
    if (type == 'status') {
        console.log('status change')
        const newStatus = req.body.updatedStatus;
        Invoices.update({ status: newStatus }, { where: { "id": id } })
            .then(
                function () {
                    console.log('Updated');
                    res.send({ type: 'success' })
                }
            )
            .catch(function (err) {
                console.log(err); res.send({
                    type: 'failed', err
                })
            }
            )
    }
})

app.get('/invoices', (req, res) => {
    const { page } = req.query;
    console.log(page)
    const itemsPerPage = 5;
    Invoices.findAll()
        .then((invoices) => {

            let more = false;

            // checking if more elements present

            if (invoices.length > page * itemsPerPage) {
                more = true;

            }
            console.log(more)

            res.send({ invoices: invoices.slice((page - 1) * itemsPerPage, page * itemsPerPage), more: more, currentPage: page });
        })
        .catch(err => console.log(err))
})

app.get('/series', async (req, res) => {
    const { lastDays } = req.query;
    let d = new Date();
    d.setHours(0, 0, 0, 0);
    let lastWeekInvoices = await Invoices.findAll({ createdAt: { $gt: new Date(d.getTime() - lastDays * 24 * 60 * 60 * 1000) } })
    let beforelastWeekInvoices = await Invoices.findAll({ createdAt: { $gt: new Date(d.getTime() - 2 * lastDays * 24 * 60 * 60 * 1000) } })
    beforelastWeekInvoices = beforelastWeekInvoices.filter(invoice => !lastWeekInvoices.find(invoice2 => invoice2.id == invoice.id));

    lastWeekInvoices = lastWeekInvoices.sort((a, b) => {if(a.createdAt > b.createdAt) return -1; else return 1})

    // map to orders only

    function getListofDays() {
        let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        console.log('Day  - ', d.getDay())
        frontdays = days.slice(0, d.getDay());
        restDays = days.slice(d.getDay(), 7);
        return restDays.concat(frontdays);
    }

    // lastWeekInvoices = lastWeekInvoices.map(invoice => invoice.total);
    // beforelastWeekInvoices = beforelastWeekInvoices.map(invoice => invoice.total);

    // console.log(lastWeekInvoices)

    // console.log(beforelastWeekInvoices)


    function mapInvoicesToDays(invoices, days) {
        const final = []
        for (let i = 0; i < days.length; i++) {
            const thatDayInvoices = invoices.filter(invoice => invoice.createdAt.getDay() == i)
            let totalofThatDayInvoices = 0;
            if (thatDayInvoices.length > 0) {
                for (let x = 0; x < thatDayInvoices.length; x++) {
                    totalofThatDayInvoices += thatDayInvoices[x].total
                }
            }
            final.push(totalofThatDayInvoices)
        }
        return final
    }




    res.send({ days: getListofDays(),lastWeekInvoices,orders:[lastWeekInvoices.length,beforelastWeekInvoices.length], series: [{ name: "Amount", data: mapInvoicesToDays(lastWeekInvoices,getListofDays()) }, { name: "Last Week Amount", data: mapInvoicesToDays(beforelastWeekInvoices,getListofDays()) },] });

})

app.listen(5001, async () => {

    await sequelize.authenticate()
    // await sequelize.sync({force:true})
    console.log('Database Connected!')
}
)