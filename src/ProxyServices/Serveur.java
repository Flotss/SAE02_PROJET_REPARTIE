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
import java.util.Arrays;

class ServeurResto implements HttpHandler {

    String response;

    Serveur serveur;

    public ServeurResto(Serveur serveur) {
            this.serveur = serveur;
        }

    public void handle(HttpExchange exchange) throws IOException {
        // Ajouter les en-têtes CORS
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:63342");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");


        this.response = this.serveur.getResto();

        exchange.sendResponseHeaders(200, this.response.getBytes().length);
        OutputStream outputStream = exchange.getResponseBody();
        outputStream.write(this.response.getBytes());
        outputStream.close();
    }

}

class ServeurResa implements HttpHandler {

    Serveur serveur;

    public ServeurResa(Serveur serveur) {
        this.serveur = serveur;
    }

    public void handle(HttpExchange exchange) throws IOException {
        // Ajouter les en-têtes CORS
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:63342");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
        byte[] allBytes = exchange.getRequestBody().readAllBytes();
        String content = new String(allBytes, "UTF-8");
        serveur.Reservation(content.split(","));
    }
}

class Serveur{

    ServiceRestaurantInterface sr;

    public Serveur(String adress, int port) {
        try {
            this.sr = (ServiceRestaurantInterface) LocateRegistry.getRegistry(adress, port).lookup("ServiceRestaurant");
        } catch (RemoteException e) {
            throw new RuntimeException(e);
        } catch (NotBoundException e) {
            throw new RuntimeException(e);
        }
    }

    public void Reservation(String[] val){
        try {
            sr.reserverResto(val[0], val[1], val[2], val[3], val[4]);
        } catch (RemoteException e) {
            throw new RuntimeException(e);
        }
    }

    public String getResto(){
        try {
            return sr.getCoordonnees();
        } catch (RemoteException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        HttpServer server = null;
        try {
            server = HttpServer.create(new InetSocketAddress(8000), 0);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Serveur serveur = new Serveur("localhost", 6789);

        server.createContext("/api/resto", new ServeurResto(serveur));
        server.createContext("/api/resa", new ServeurResa(serveur));
        server.start();
    }
}