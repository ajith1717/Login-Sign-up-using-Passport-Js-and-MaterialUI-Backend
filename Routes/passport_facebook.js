module.exports = (app, passport) => {
    // app.use(passport.initialize());
    var passportFacebook = require("passport-facebook").Strategy;
    passport.use(
      new passportFacebook(
        {
          clientID: "633434900701368",
          clientSecret: "3664ee408d9bdebb1a52dc509db401cf",
          callbackURL: "http://localhost:3000/auth/facebook/callback",
          profileFields: ["id", "displayName", "photos", "email"],
        },
        (acceToken, refreshToken, profile, done) => {
          done(null, profile);
        }
      )
    );
  
    passport.serializeUser((user, done) => {
      done(null, user);
    });
  
    app.get("/auth/facebook", passport.authenticate("facebook"));
  
    app.get(    
      "/auth/facebook/callback",
      passport.authenticate("facebook"),
      (req, res) => {
        res.redirect('http://localhost:3001/Homepage')
      }
    );
  };