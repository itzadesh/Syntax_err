var express = require('express');
var router = express.Router();

var database = require('./sqllib');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
});

router.post('/login', function(request, response, next){

    var user_enrollment_number = request.body.user_enrollment_number;

    var user_password = request.body.user_password;

    if(user_enrollment_number && user_password)
    {
        query = `
        SELECT * FROM users
        WHERE Enrollment_Number = "${user_enrollment_number}"
        `;

        database.query(query, function(error, data){

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].user_Passwords == user_password)
                    {
                        request.session.id = data[count].id;

                        response.redirect("/");
                    }
                    else
                    {
                        response.send('Incorrect Password');
                    }
                }
            }
            else
            {
                response.send('Incorrect Enrollment Number');
            }
            response.end();
        });
    }
    else
    {
        response.send('Please Enter Enrollment Number and Password Details');
        response.end();
    }

});

router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/");

});

module.exports = router;