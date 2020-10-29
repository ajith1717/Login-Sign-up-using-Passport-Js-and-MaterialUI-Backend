module.exports = (app, passport) => {
    var passportGithub = require("passport-github2").Strategy;
  
    app.use(passport.initialize());
    passport.use(
      new passportGithub(
        {
          clientID: "27021851184192e668af",
          clientSecret: "f32aa1c904b750545ecca646ff464ea9d3a2b9d0",
          callbackURL: "http://localhost:3000/auth/github/callback",
        },
        (accessToken, refreshToken, profile, done) => {
          done(null, profile);
        }
      )
    );
  
    passport.serializeUser((user, done) => {
      done(null, user);
    });
  
    app.get("/auth/github", passport.authenticate("github"));
  
    app.get(
      "/auth/github/callback",
      passport.authenticate("github"),
      (req, res) => {
        // res.send("login with github account");
        res.redirect('http://localhost:3001/Homepage')
      }
    );
  };