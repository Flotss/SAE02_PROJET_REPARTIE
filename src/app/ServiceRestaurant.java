package app;

import java.rmi.RemoteException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

//Service
public class ServiceRestaurant implements ServiceRestaurantInterface
{

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

         StringBuilder restaurantBuilder = new StringBuilder();
         restaurantBuilder.append("{");
         restaurantBuilder.append("\"ID\": ").append(id).append(",");
         restaurantBuilder.append("\"NOM\": \"").append(nom).append("\",");
         restaurantBuilder.append("\"ADRESSE\": \"").append(adresse).append("\",");
         restaurantBuilder.append("\"GPS\": \"").append(gps).append("\"");
         restaurantBuilder.append("}");

         restaurantsList.add(restaurantBuilder.toString());
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
         String SQLInsert = "INSERT INTO RESERVATION (IDRESTAURANT, NOM, PRENOM, NBCONVIVES, TELEPHONE) VALUES (?, ?, ?, ?, ?);";
         PreparedStatement prepStatement = connection.prepareStatement(SQLInsert);
         prepStatement.setString(1, idRestaurant);
         prepStatement.setString(2, nom);
         prepStatement.setString(3, prenom);
         prepStatement.setString(4, nb);
         prepStatement.setString(5, tel);
         prepStatement.executeUpdate();

         System.out.println("Réservation effectuée avec succès.");
         return "Réservation effectuée avec succès.";
      } catch (SQLException e) {
         System.out.println("Erreur lors de la réservation : " + e.getMessage());
         return "Erreur lors de la réservation : " + e.getMessage();
      }
   }
}