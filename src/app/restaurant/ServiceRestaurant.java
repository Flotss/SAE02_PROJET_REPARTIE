package app.restaurant;

import java.rmi.RemoteException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

//Service
public class ServiceRestaurant implements ServiceRestaurantInterface {

    Connection connection;

    public ServiceRestaurant() throws SQLException {
        String url = "jdbc:oracle:thin:@charlemagne.iutnc.univ-lorraine.fr:1521:infodb";
        connection = DriverManager.getConnection(url, "amirbeky1u", "Nardos2002@");
    }

    @Override
    public String getCoordonnees() throws RemoteException, SQLException {
        List<String> restaurantsList = new ArrayList<>();

        System.out.println("Récupération des données");
        String SQLPrep = "SELECT * FROM Restaurant";
        PreparedStatement prep1 = connection.prepareStatement(SQLPrep);
        prep1.execute();
        ResultSet rs = prep1.getResultSet();

        // Parcourir les résultats et construire la liste des restaurants sous forme de chaînes de caractères JSON
        while (rs.next()) {
            int id = rs.getInt("ID");
            String nom = rs.getString("NOM");
            String adresse = rs.getString("ADRESSE");
            String gps = rs.getString("GPS");

            String restaurantBuilder = "{" +
                    "\"ID\": " + id + "," +
                    "\"NOM\": \"" + nom + "\"," +
                    "\"ADRESSE\": \"" + adresse + "\"," +
                    "\"GPS\": \"" + gps + "\"" +
                    "}";

            restaurantsList.add(restaurantBuilder);
        }

        // Construction du format JSON final
        StringBuilder jsonBuilder = new StringBuilder();
        jsonBuilder.append("{");
        jsonBuilder.append("\"restaurants\": [");

        for (int i = 0; i < restaurantsList.size(); i++) {
            String restaurant = restaurantsList.get(i);
            jsonBuilder.append(restaurant);

            if (i < restaurantsList.size() - 1) {
                jsonBuilder.append(",");
            }
        }

        jsonBuilder.append("]");
        jsonBuilder.append("}");

        return jsonBuilder.toString();
    }


    @Override
    public String reserverResto(String idRestaurant, String nom, String prenom, String nb, String tel) throws RemoteException {
        try {
            System.out.println("Réservation en cours...");
            PreparedStatement ps = connection.prepareStatement("insert into Reservation (IDRESTAURANT, NOM, PRENOM, NBCONVIVES, TELEPHONE) values (?, ?, ?, ?, ?)");
            ps.setInt(1, Integer.parseInt(idRestaurant));
            ps.setString(2, nom);
            ps.setString(3, prenom);
            ps.setInt(4, Integer.parseInt(nb));
            ps.setString(5, tel);
            ps.executeUpdate();
            System.out.println("OK");
            return "{ \"status\": \"OK\", \"message\": \"Réservation effectuée\" }";
        } catch (SQLException e) {
            System.out.println();
            System.out.println("Erreur lors de la réservation : " + e.getMessage());
            return "{ \"status\": \"KO\", \"message\": \"Erreur lors de la réservation\" }";
        }
    }


    @Override
    public String addRestaurant(String nom, String adresse, String gps) throws RemoteException {
        try {
            System.out.println("Ajout du restaurant en cours...");
            String SQLInsert = "INSERT INTO Restaurant (NOM, ADRESSE, GPS) VALUES (?, ?, ?)";
            PreparedStatement prepStatement = connection.prepareStatement(SQLInsert);
            prepStatement.setString(1, nom);
            prepStatement.setString(2, adresse);
            prepStatement.setString(3, gps);
            prepStatement.executeUpdate();

            System.out.println("Restaurant ajouté avec succès.");
            return "{ \"status\": \"OK\", \"message\": \"Ajout de restaurant réussi\" }";
        } catch (SQLException e) {
            System.out.println("Erreur lors de l'ajout du restaurant : " + e.getMessage());
            return "{ \"status\": \"KO\", \"message\": \"Ajout de restaurant échoué\" }";
        }
    }

}