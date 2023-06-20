package ProxyServices;

import ProxyServices.HTTPHandler.ServeurAjoutRestaurant;
import ProxyServices.HTTPHandler.ServeurProxy;
import ProxyServices.HTTPHandler.ServeurReservation;
import ProxyServices.HTTPHandler.ServeurRestaurant;
import app.proxy.ServiceProxyBlocageInterface;
import app.restaurant.Service.ServiceRestaurantInterface;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.sql.SQLException;
import java.util.Arrays;


public class Serveur {

    private final ServiceRestaurantInterface sr;
    private final ServiceProxyBlocageInterface spb;

    public Serveur(String adresseRestaurant, int portRestaurant, String adresseProxy, int portProxy) {
        try {
            this.sr = (ServiceRestaurantInterface) LocateRegistry.getRegistry(adresseRestaurant, portRestaurant).lookup("ServiceRestaurant");
            this.spb = (ServiceProxyBlocageInterface) LocateRegistry.getRegistry(adresseProxy, portProxy).lookup("ServiceProxyBlocage");
        } catch (RemoteException | NotBoundException e) {
            throw new RuntimeException(e);
        }
    }

    public String reservation(String[] val) {
        try {
            return sr.makeReservation(val[0], val[1], val[2], val[3], val[4]);
        } catch (RemoteException e) {
            throw new RuntimeException(e);
        }
    }

    public String addRestaurant(String[] val) {
        try {
            System.out.println(Arrays.toString(val));
            return sr.addRestaurant(val[0], val[1], val[2] + ", " + val[3]);
        } catch (RemoteException e) {
            throw new RuntimeException(e);
        }
    }

    public String getResto() {
        try {
            return sr.getCoordonnees();
        } catch (RemoteException | SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public String makeRequest(String url) {
        try {
            return spb.makeRequest(url);
        } catch (RemoteException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        if (args.length == 0) {
            args = new String[]{"localhost", "10002", "localhost", "10001"};
        }else if (args.length < 4) {
            System.out.println("Usage: java Serveur <adresseRestaurant> <portRestaurant> <adresseProxy> <portProxy>");
            System.exit(1);
        }


        HttpServer server;
        try {
            server = HttpServer.create(new InetSocketAddress(8000), 0);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Serveur serveur = new Serveur(args[0], Integer.parseInt(args[1]),
                                          args[2], Integer.parseInt(args[3]));

        server.createContext("/api/restaurations", new ServeurRestaurant(serveur));
        server.createContext("/api/reservation", new ServeurReservation(serveur));
        server.createContext("/api/addRestaurant", new ServeurAjoutRestaurant(serveur));
        server.createContext("/api/proxy", new ServeurProxy(serveur));
        server.start();


        System.out.println("Serveur lancé sur le port 8000");
    }
}