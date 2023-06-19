package ProxyServices.HTTPHandler;

import ProxyServices.Serveur;
import com.sun.net.httpserver.HttpHandler;

public abstract class Handler implements HttpHandler {

    protected String response;
    protected Serveur serveur;

    public Handler(Serveur serveur) {
        this.serveur = serveur;
    }
}
