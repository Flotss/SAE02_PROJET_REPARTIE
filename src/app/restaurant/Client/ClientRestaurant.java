package app.restaurant.Client;

import app.restaurant.Service.ServiceRestaurantInterface;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class ClientRestaurant {

    final static String service = "ServiceRestaurant";
    static int port = 6789;
    static String host = "localhost";

    public static void main(String[] args) throws RemoteException, NotBoundException {
        if (args.length == 2) {
            host = args[0];
            port = Integer.parseInt(args[1]);
        } else if (args.length == 1) {
            host = args[0];
        } else if (args.length == 0) {
            System.out.println("Using default values: host = localhost, port = 10002");
        } else {
            System.out.println("Usage: java -jar ClientRestaurant.jar [host] [port]");
            System.exit(1);
        }

        // Recherche du service
        ServiceRestaurantInterface serviceRestaurant = (ServiceRestaurantInterface) LocateRegistry.getRegistry(host, port).lookup(service);


        Scanner scanner = new Scanner(System.in);
        System.out.println("Bienvenue dans le client restaurant");
        System.out.println("Example pour faire une reservation : ");
        System.out.println("0. Quitter");

        Class<?> serviceRestaurantClass = serviceRestaurant.getClass();
        Map<Integer, Method> methods = new HashMap<>();

        // On ne veut pas les méthodes java tel que equals, hashCode, toString, etc.
        List<String> javaMethods = List.of("equals", "hashCode", "toString", "notify", "notifyAll", "wait", "getClass", "proxyClassLookup");

        int i = 1;
        for (Method method : serviceRestaurantClass.getDeclaredMethods()) {
            if (method.getDeclaringClass() == serviceRestaurantClass && !javaMethods.contains(method.getName())) {
                methods.put(i, method);
                System.out.println(i + ". " + method.getName());
                i++;
            }
        }


        if (methods.size() == 0) {
            System.out.println("Aucune méthode trouvée");
            System.exit(2);
        }


        int choice;
        while (true) {
            System.out.println("Quelle fonction voulez-vous utiliser ?");
            choice = scanner.nextInt();

            while (!methods.containsKey(choice) && choice != 0) {
                System.out.println("Veuillez entrer un nombre valide");
                choice = scanner.nextInt();
            }

            // EXIT
            if (choice == 0) {
                System.out.println("Fin du client restaurant");
                scanner.close();
                System.exit(0);
            }

            Method method = methods.get(choice);

            // Demande des paramètres
            Object[] params = new Object[method.getParameterCount()];
            for (int j = 0; j < method.getParameterCount(); j++) {
                Parameter parameter = method.getParameters()[j];
                System.out.println("Veuillez entrer le paramètre " + (j + 1) + " " + parameter.getName() + " de type " + parameter.getType().getSimpleName());
                if (method.getParameterTypes()[j] == int.class) {
                    params[j] = scanner.nextInt();
                } else if (method.getParameterTypes()[j] == String.class) {
                    params[j] = scanner.next();
                }
            }

            // Appel de la méthode
            try {
                Object result = method.invoke(serviceRestaurant, params);
                System.out.println("Résultat: " + result);
            } catch (Exception e) {
                System.out.println("Erreur: " + e.getMessage());
            }
        }


    }
}
