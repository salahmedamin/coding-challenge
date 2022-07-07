import app from "./server";

app.listen(process.env.PORT || 4000, () =>
  console.log(`Listening on ${process.env.PORT}`)
);
