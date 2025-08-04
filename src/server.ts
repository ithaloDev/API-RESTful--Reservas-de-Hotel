import app from "./app";

app.listen({port:3000}, function (err,address) {
    if(err){
        console.error(err);
        process.exit(1);
    }

    console.log('Port is running on 3000');
})