package ProxyServices;

import app.LancerService;
import app.proxy.ServiceProxyBlocageInterface;
import app.restaurant.Service.ServiceRestaurantInterface;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.sql.SQLException;
import java.util.Arrays;

class ServeurRestaurant implements HttpHandler {

    String response;

    Serveur serveur;

    public ServeurRestaurant(Serveur serveur) {
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

class ServeurReservation implements HttpHandler {

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

class ServeurAjoutRestaurant implements HttpHandler {

    Serveur serveur;

    String response;

    public ServeurAjoutRestaurant(Serveur serveur) {
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
        this.response = this.serveur.addRestaurant(content.split(","));

        exchange.sendResponseHeaders(200, this.response.getBytes().length);
        OutputStream outputStream = exchange.getResponseBody();
        outputStream.write(this.response.getBytes());
        outputStream.close();
    }
}


class ServeurProxy implements HttpHandler {

    Serveur serveur;

    String response;

    public ServeurProxy(Serveur serveur) {
        this.serveur = serveur;
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

class Serveur{

    ServiceRestaurantInterface sr;
    ServiceProxyBlocageInterface spb;

    public Serveur(String adress, int port) {
        try {
            this.sr = (ServiceRestaurantInterface) LocateRegistry.getRegistry(adress, port).lookup("ServiceRestaurant");
            this.spb = (ServiceProxyBlocageInterface) LocateRegistry.getRegistry(adress, port).lookup("ServiceProxyBlocage");
        } catch (RemoteException | NotBoundException e) {
            throw new RuntimeException(e);
        }
    }

    public String reservation(String[] val){
        try {
            return sr.makeReservation(val[0], val[1], val[2], val[3], val[4]);
        } catch (RemoteException e) {
            throw new RuntimeException(e);
        }
    }

    public String addRestaurant(String[] val){
        try {
            System.out.println(Arrays.toString(val));
            return sr.addRestaurant(val[0], val[1], val[2] + ", " + val[3]);
        } catch (RemoteException e) {
            throw new RuntimeException(e);
        }
    }

    public String getResto(){
        try {
            return sr.getCoordonnees();
        } catch (RemoteException | SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public String makeRequest(String url){
        try {
            return spb.makeRequest(url);
        } catch (RemoteException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        LancerService.start();


        HttpServer server;
        try {
            server = HttpServer.create(new InetSocketAddress(8000), 0);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Serveur serveur = new Serveur("localhost", 6789);

        server.createContext("/api/restaurations", new ServeurRestaurant(serveur));
        server.createContext("/api/reservation", new ProxyServices.ServeurReservation(serveur));
        server.createContext("/api/addRestaurant", new ProxyServices.ServeurAjoutRestaurant(serveur));
        server.createContext("/api/proxy", new ServeurProxy(serveur));
        server.start();
    }
}