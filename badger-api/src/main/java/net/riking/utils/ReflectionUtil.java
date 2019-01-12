package net.riking.utils;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;

import org.apache.commons.lang3.StringUtils;

public class ReflectionUtil {

	/**
	 * 调用Getter方法
	 * 
	 * @param object 对象
	 * 
	 * @param propertyName 属性名称
	 */
	public static Object invokeGetterMethod(Object object, String propertyName) {
		String getterMethodName = "get" + StringUtils.capitalize(propertyName);
		try {
			Method getterMethod = object.getClass().getMethod(getterMethodName);
			return getterMethod.invoke(object);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 调用Setter方法
	 * 
	 * @param object 对象
	 * 
	 * @param propertyName 属性名称
	 * 
	 * @param propertyValue 属性值
	 * @throws NoSuchFieldException
	 * @throws SecurityException
	 */
	public static void invokeSetterMethod(Object object, String propertyName, Object propertyValue) {
		Class<?> setterMethodClass = null;
		try {
			setterMethodClass = getPropertyClass(object,
					propertyName.substring(0, 1).toLowerCase() + propertyName.substring(1));
		} catch (Exception e) {
			setterMethodClass = propertyValue.getClass();
			e.printStackTrace();
		}
		invokeSetterMethod(object, propertyName, propertyValue, setterMethodClass);
	}

	private static Class<?> getPropertyClass(Object object, String propertyName) throws Exception {
		Class<?> setterMethodClass = null;
		try {
			setterMethodClass = object.getClass().getDeclaredField(propertyName).getType();
		} catch (Exception e1) {
			try {
				setterMethodClass = object.getClass().getSuperclass().getDeclaredField(propertyName).getType();
			} catch (Exception e) {
				setterMethodClass = object.getClass().getSuperclass().getSuperclass().getDeclaredField(propertyName)
						.getType();
			}
		}
		return setterMethodClass;
	}

	/**
	 * 调用Setter方法
	 * 
	 * @param object 对象
	 * 
	 * @param propertyName 属性名称
	 * 
	 * @param propertyValue 属性值
	 * 
	 * @param setterMethodClass 参数类型
	 */
	public static void invokeSetterMethod(Object object, String propertyName, Object propertyValue,
			Class<?> setterMethodClass) {
		String setterMethodName = "set" + StringUtils.capitalize(propertyName);
		try {
			Method setterMethod = object.getClass().getMethod(setterMethodName, setterMethodClass);
			if (propertyValue != null) {
				if (!propertyValue.getClass().isAssignableFrom(setterMethodClass))
					if ("".equals(propertyValue) && propertyValue != null) {
						propertyValue = null;
					} else if (setterMethodClass.isAssignableFrom(BigDecimal.class)) {
						propertyValue = new BigDecimal(propertyValue.toString());
					} else if (setterMethodClass.isAssignableFrom(Date.class)) {
						propertyValue = DateUtil.strToDate(propertyValue.toString(), "yyyy-MM-dd");
					}

				setterMethod.invoke(object, new Object[] { propertyValue });
			} else {
				setterMethod.invoke(object, new Object[] { null });
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取对象属性值,无视private/protected/getter
	 * 
	 * @param object 对象
	 * 
	 * @param fieldName 属性名称
	 */
	public static Object getFieldValue(Object object, String fieldName) {
		Field field = getAccessibleField(object, fieldName);
		if (field == null) {
			throw new IllegalArgumentException("Could not find field " + fieldName);
		}
		Object result = null;
		try {
			result = field.get(object);
		} catch (IllegalAccessException e) {

		}
		return result;
	}

	/**
	 * 设置对象属性值,无视private/protected/setter
	 * 
	 * @param object 对象
	 * 
	 * @param fieldName 属性名称
	 */
	public static void setFieldValue(Object object, String fieldName, Object value) {
		Field field = getAccessibleField(object, fieldName);
		if (field == null) {
			throw new IllegalArgumentException("Could not find field " + fieldName);
		}
		try {
			field.set(object, value);
		} catch (IllegalAccessException e) {

		}
	}

	private static Field getAccessibleField(final Object object, final String fieldName) {
		for (Class<?> superClass = object.getClass(); superClass != Object.class; superClass = superClass
				.getSuperclass()) {
			try {
				Field field = superClass.getDeclaredField(fieldName);
				field.setAccessible(true);
				return field;
			} catch (NoSuchFieldException e) {

			}
		}
		return null;
	}

	/**
	 * 将对象有值的fields转换成HashMap field不能为基本数据类型
	 * 
	 * @param object 源对象
	 * 
	 * @return HashMap 结构为 key:name value:value
	 * 
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static HashMap object2HashMap(Object object) {
		HashMap result = new HashMap();
		Class<? extends Object> objectClass = object.getClass();
		Field[] fields = objectClass.getDeclaredFields();

		for (Field field : fields) {
			field.setAccessible(true);
			Object value = null;
			try {
				value = field.get(object);
				if (value != null && !"".equals(value.toString())) {
					result.put(field.getName(), value);
				}
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * 通过对象object操作只有一个参数param或无参数的方法method
	 * @param object 操作对象
	 * @param clazz 操作对象的类型
	 * @param method 调用的方法
	 * @param param 参数，可以是一个，也可以是null表示无参数
	 */
	public static Object invokeMethod(Object object, Class<?> clazz, String method, Object param) {
		try {
			if (null != param) {
				Method method2 = clazz.getMethod(method, String.class);
				return method2.invoke(object, param);
			} else {
				Method method2 = clazz.getMethod(method);
				return method2.invoke(object);
			}
		} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException
				| InvocationTargetException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 通过对象object操作只有一个参数param或无参数的方法method
	 * @param object 操作对象
	 * @param clazz 操作对象的类型
	 * @param method 调用的方法
	 * @param param 参数，可以是一个，也可以是null表示无参数
	 */
	public static Object invokeMethod(Object object, Class<?> clazz, String method, Object param, Object param2) {
		try {
			if (null != param) {
				Method method2 = clazz.getMethod(method, param.getClass(), param2.getClass());
				return method2.invoke(object, param, param2);
			} else {
				Method method2 = clazz.getMethod(method, param2.getClass());
				return method2.invoke(object, param2);
			}
		} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException
				| InvocationTargetException e) {
			e.printStackTrace();
			return null;
		}
	}
}