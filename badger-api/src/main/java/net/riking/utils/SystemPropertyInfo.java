package net.riking.utils;

import java.io.IOException;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.core.io.ClassPathResource;

/**
 *
 */
public class SystemPropertyInfo {
	static Properties properties = new Properties();
	private static String propertyName = "application-dev.properties";
	
	private static String driver;
	private static String url;
	private static String user;
	private static String password;

	/** 配置文件信息信息实例 */
	private static SystemPropertyInfo instance = null;

	/**
	 * 实例化配置文件信息
	 * 
	 * @return 配置文件信息实例
	 * 
	 */
	public static synchronized SystemPropertyInfo getInstance() {
		if (instance == null) {
			instance = new SystemPropertyInfo();
			instance.init();
		}
		return instance;
	}

	private static String getProperty(String key) {
		Pattern p = Pattern.compile("\\$\\{(\\w+)\\}");
		Matcher m = null;
		String value = properties.getProperty(key);
		if (isEmpty(value)) {
			return null;
		}
		while ((m = p.matcher(value)).find()) {
			key = m.group(1);
			value = value.replaceAll(p.pattern(), properties.getProperty(key));
		}
		return value;
	}

	public void init() {
		try {
			properties.load(new ClassPathResource(propertyName).getInputStream());
			this.setDriver(getProperty("spring.datasource.driverClassName"));
			this.setUrl(getProperty("spring.datasource.url"));
			this.setUser(getProperty("spring.datasource.username"));
			this.setPassword(getProperty("spring.datasource.password"));

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private static boolean isEmpty(String value) {
		return (value == null || value.trim().equals("")) ? true : false;
	}

	public static String getDriver() {
		return driver;
	}

	public void setDriver(String driver) {
		SystemPropertyInfo.driver = driver;
	}

	public static String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		SystemPropertyInfo.url = url;
	}

	public static String getUser() {
		return user;
	}

	public void setUser(String user) {
		SystemPropertyInfo.user = user;
	}

	public static String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		SystemPropertyInfo.password = password;
	}

}
