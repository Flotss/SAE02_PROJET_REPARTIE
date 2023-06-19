package ProxyServices.HTTPHandler;

import ProxyServices.Serveur;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class ServeurReservation implements HttpHandler {

    Serveur serveur;

    String response;

    public ServeurReservation(Serveur serveur) {
        this.serveur = serveur;
    }

    public void handle(HttpExchange exchange) throws IOException {
        // Ajouter les en-têtes CORS
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:63342");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
        byte[] allBytes = exchange.getRequestBody().readAllBytes();
        String content = new String(allBytes, StandardCharsets.UTF_8);
        //serveur.Reservation(content.split(","));
        System.out.println(Arrays.toString(content.split(",")));
        this.response = this.serveur.reservation(content.split(","));

        exchange.sendResponseHeaders(200, this.response.getBytes().length);
        OutputStream outputStream = exchange.getResponseBody();
        outputStream.write(this.response.getBytes());
        outputStream.close();
    }
}
