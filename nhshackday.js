var Appointments = new Mongo.Collection("Appointments");

Router.route('/', function() {
  this.render('Home', {data: {id: (Math.random()*1000000).toString(36)}});
});

Router.route('/create/:id', function() {

});

Router.route('/appointments/:id', function() {
  var appointment = Appointments.find({id:id});
  this.render('Appointment', {data: {appointment: appointment}});
});
