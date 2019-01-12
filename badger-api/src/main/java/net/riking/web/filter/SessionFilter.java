package net.riking.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.springframework.beans.factory.annotation.Value;

public class SessionFilter implements Filter {
	@Value("${sso.api.url}")
	private String SSO_API_URL;

//	@Autowired
//	RestTemplate restTemplate;

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
			throws IOException, ServletException {
		// HttpServletRequest hreq = (HttpServletRequest) req;
		// HttpServletResponse hresp = (HttpServletResponse) resp;
		// String token = hreq.getHeader("auth");
		// if (StringUtils.isEmpty(token)) {
		// hresp.setStatus(HttpStatus.BAD_REQUEST.value());
		// return;
		// }
		// // 删除contextPath
		// String path =
		// hreq.getRequestURI().replace(hreq.getServletContext().getContextPath(),
		// "");
		//
		// ResponseEntity<Token> apiResp = restTemplate
		// .getForEntity(SSO_API_URL.concat("/accessPath?token={token}&path={path}"),
		// Token.class, token, path);
		// if (HttpStatus.OK != apiResp.getStatusCode()) {
		// hresp.setStatus(apiResp.getStatusCode().value());
		// return;
		// }
		chain.doFilter(req, resp);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

}
