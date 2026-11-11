function checkAdmin(req, res, next) {

    if (req.session.user && req.session.user.role === "admin") {
        next();
    } 
    
    else {
        res.status(403).json({
            erreur: "Accès refusé : vous devez être administrateur"
        });
    }
}

export default checkAdmin;
