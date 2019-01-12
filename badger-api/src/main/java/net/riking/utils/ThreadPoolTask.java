package net.riking.utils;

import java.util.concurrent.ThreadPoolExecutor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;


@Component
public class ThreadPoolTask {

	@Value("${spring.thread.pool.corePoolSize}")
	private int corePoolSize;
	@Value("${spring.thread.pool.maxPoolSize}")
	private int maxPoolSize;
	@Value("${spring.thread.pool.keepAliveSeconds}")
	private int keepAliveSeconds;
	@Value("${spring.thread.pool.queueCapacity}")
	private int queueCapacity;
	
	
	@Bean(name = "executor")
	public ThreadPoolTaskExecutor executor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		//配置核心线程数
		executor.setCorePoolSize(corePoolSize);
		//配置最大线程数
		executor.setMaxPoolSize(maxPoolSize);
		//配置队列大小
		executor.setQueueCapacity(queueCapacity);
		//活跃时间
		executor.setKeepAliveSeconds(keepAliveSeconds);
		//配置线程池中的线程的名称前缀
		executor.setThreadNamePrefix("ExecutorValidate-");
		// setRejectedExecutionHandler：当pool已经达到max size的时候，如何处理新任务
        // CallerRunsPolicy：不在新线程中执行任务，而是由调用者所在的线程来执行
		executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
		executor.initialize();
		return executor;
	}
}