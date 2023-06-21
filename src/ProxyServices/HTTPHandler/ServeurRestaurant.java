package ProxyServices.HTTPHandler;

import ProxyServices.Serveur;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;

public class ServeurRestaurant extends Handler {

    public ServeurRestaurant(Serveur serveur) {
        super(serveur);
    }

    public void handle(HttpExchange exchange) throws IOException {
        // Ajouter les en-têtes CORS
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "https://webetu.iutnc.univ-lorraine.fr");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");


        this.response = this.serveur.getResto();

        exchange.sendResponseHeaders(200, this.response.getBytes().length);
        OutputStream outputStream = exchange.getResponseBody();
        outputStream.write(this.response.getBytes());
        outputStream.close();
    }

}
