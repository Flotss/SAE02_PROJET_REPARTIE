package ProxyServices.HTTPHandler;

import ProxyServices.Serveur;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;

public class ServeurProxy extends Handler {

    public ServeurProxy(Serveur serveur) {
        super(serveur);
    }

    public void handle(HttpExchange exchange) throws IOException {
        // Ajouter les en-têtes CORS
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:63342");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

        // Recherche de la valeur du paramètre "url"
        String query = exchange.getRequestURI().getQuery();
        String[] querySplit = query.split("=");
        String url = querySplit[1];


        this.response = this.serveur.makeRequest(url);

        exchange.sendResponseHeaders(200, this.response.getBytes().length);
        OutputStream outputStream = exchange.getResponseBody();
        outputStream.write(this.response.getBytes());
        outputStream.close();
    }
}
