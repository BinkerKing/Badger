package net.riking.web.filter;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import net.riking.core.service.DataDictService;
import net.riking.core.service.LocaleService;
import net.riking.core.workflow.WorkflowMgr;

@Component
public class StartupListener implements ServletContextListener {
	private static final Logger logger = LogManager.getLogger(StartupListener.class);


	@Autowired
	WorkflowMgr workflowMgr;

	@Autowired
	LocaleService localeService;


	@Autowired
	DataDictService dataDictService;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void contextInitialized(ServletContextEvent event) {
		dataDictService.init();
		localeService.init();
	}

	/**
	 * Shutdown servlet context (currently a no-op method).
	 *
	 * @param servletContextEvent The servlet context event
	 */
	@Override
	public void contextDestroyed(ServletContextEvent servletContextEvent) {
		logger.info("destroy startupListener context...");
	}

}
