/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package csdlpt;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author dhhsv
 */
class Testing {

    public static void main(String[] args) {
        String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik5WNyIsImVtYWlsIjoibnY2QGdtYWlsLmNvbSIsInJvbGUiOiJzdGFmZiIsImlhdCI6MTc2MzI3MzMxNSwiZXhwIjoxNzYzMjc2OTE1fQ.vI8Cc4351Vs4XqxOU04JfqmrEAmuzWt9tvcwD0DJExs";
        System.err.println("Heello world");
        JSONObject responseJson = AuthService.getUserInfo(token);
        JSONArray staffArr = responseJson.getJSONArray("staff");
        JSONObject staffObj = staffArr.getJSONObject(0);
        String thanhpho = staffObj.getString("thanhpho");

        System.err.println(thanhpho);
    }

}
