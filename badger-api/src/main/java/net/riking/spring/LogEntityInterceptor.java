package net.riking.spring;

import java.io.Serializable;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.EmptyInterceptor;
import org.hibernate.type.Type;

/**
 * Hibernate 拦截器
 */
public class LogEntityInterceptor extends EmptyInterceptor {

	private static final long serialVersionUID = 1L;

	private Logger logger = LogManager.getLogger(LogEntityInterceptor.class);

	public void onDelete(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) {
		logger.info("删除数据");
	}

	public boolean onFlushDirty(Object entity, Serializable id, Object[] currentState, Object[] preState,
			String[] propertyNames, Type[] types) {
		logger.info("修改数据");
		return false;
	}

	public boolean onSave(Object entity, Serializable id, Object[] State, String[] propertyNames, Type[] types) {
		logger.info("保存数据");
		return false;
	}
}