const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

app.use(express.json());
app.use(cors());

//connection
const db = require("./models");

db.mongoose
  .connect(
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connexion sucess");
  })
  .catch((err) => {
    console.log("connexion error");
    process.exit();
  });

app.get("/commands/allactivecommands", async (req, res) => {
  await db.commands
    .find({ isInDelivery: false, isAcceptedByRestaurateur: true })
    .then((rep) => {
      console.log("oui");
      res.send(rep);
    });
});

db.mongoose
  .connect(
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connexion sucess");
  })
  .catch((err) => {
    console.log("connexion error");
  });

//routes
app.get("/commands/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.get("/commands/:id_user", (req, res) => {
  var id_user = req.params.id_user;
  console.log(id_user);
  db.commands
    .find({ customerId: id_user })
    .then((e) => {
      res.status(200).json(e);
    })
    .catch(() => {
      res.status(404).json({ message: "no command found" });
    });
});

app.patch("/commands/:commandid", async (req, res) => {
  console.log(req.params);
  await db.commands.findByIdAndUpdate(
    { _id: req.params.commandid },
    { isPaid: true }
  );
  res.status(200).send();
});

app.patch("/command/takedelivery/:commandid", async (req, res) => {
  console.log(req.params);
  await db.commands.findOneAndUpdate(
    { _id: req.params.commandid },
    { isInDelivery: true }
  );

  res.status(204).send();
});

app.post("/commands/send", (req, res) => {
  console.table(req.body);

  var newCommand = {
    customerId: req.body.customerId,
    restorantId: req.body.customerId,
    date: req.body.date,
    articles: req.body.articles,
    price: req.body.price,
    adress: req.body.adress,
    city: req.body.city,
    codePostal: req.body.codePostal,
    isPaid: false,
    isAcceptedByRestaurateur: false,
    isInDelivery: false,
  };

  //sensors.push(newSensor);
  console.log(newCommand.articles);
  db.commands
    .insertMany(newCommand)
    .then((rep) => {
      res
        .status(200)
        .json({
          message: `la command a bien été passée`,
          commandid: rep[0]._id,
        });
    })
    .catch((e) => {
      console.log(e);
      res.status(404).json({ message: `problème` });
    })
    .catch(() => {
      res.status(404).json({ message: "no command found" });
    });
});

app.patch("/commands/:commandid", async (req, res) => {
  console.log(req.params);
  await db.commands.findByIdAndUpdate(
    { _id: req.params.commandid },
    { isPaid: true }
  );
  res.status(200).send();
});

app.post("/commands/send", (req, res) => {
  console.table(req.body);

  var newCommand = {
    customerId: req.body.customerId,
    restorantId: req.body.customerId,
    date: req.body.date,
    articles: req.body.articles,
    price: req.body.price,
    isPaid: false,
  };

  //sensors.push(newSensor);
  console.log(newCommand.articles);
  db.commands
    .insertMany(newCommand)
    .then((rep) => {
      res.status(200).json({
        message: `la command a bien été passée`,
        commandid: rep[0]._id,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(404).json({ message: `problème` });
    });

  //console.log(items)
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("server is running on port" + process.env.SERVER_PORT);
});
