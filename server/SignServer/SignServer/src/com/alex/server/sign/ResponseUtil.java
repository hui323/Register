package com.alex.server.sign;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

public class ResponseUtil {

	public static void setResponseSuccess(HttpServletResponse resp,
			Object object) throws IOException { 
		resp.setCharacterEncoding("UTF-8");
		JSONObject responseJson = new JSONObject();
		responseJson.put("code", 0);
		if (object != null) {
			responseJson.put("data", JSON.toJSON(object));
		} else {
			responseJson.put("data", new JSONObject());
		}
		responseJson.put("msg", "success");
		resp.getWriter().write(responseJson.toString());
	}

	public static void setResponseError(HttpServletResponse resp, int code,
			String msg) throws IOException { 
		resp.setCharacterEncoding("UTF-8");
		JSONObject responseJson = new JSONObject();
		responseJson.put("code", code);
		responseJson.put("data", new JSONObject());
		responseJson.put("msg", msg);
		resp.getWriter().write(responseJson.toString());
	}
}
