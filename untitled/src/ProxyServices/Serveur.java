package ProxyServices;

import app.ServiceRestaurant;
import app.ServiceRestaurantInterface;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.sql.SQLException;

class Serveur implements HttpHandler {

    String response;

    public Serveur(String adress, int port){
        try {
            ServiceRestaurantInterface sr = (ServiceRestaurantInterface) LocateRegistry.getRegistry(adress, port).lookup("ServiceRestaurant");
            this.response = sr.getCoordonnees();
        } catch (RemoteException e) {
            throw new RuntimeException(e);
        } catch (NotBoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    public void handle(HttpExchange exchange) throws IOException {
        // Ajouter les en-têtes CORS
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:63342");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

        System.out.println(this.response.getBytes().length);
        exchange.sendResponseHeaders(200, this.response.getBytes().length);
        OutputStream outputStream = exchange.getResponseBody();
        outputStream.write(this.response.getBytes());
        outputStream.close();
    }

    public static void main(String[] args) {
        HttpServer server = null;
        try {
            server = HttpServer.create(new InetSocketAddress(8000), 0);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        server.createContext("/votre-route", new Serveur("localhost", 6789));

        server.start();
    }
}