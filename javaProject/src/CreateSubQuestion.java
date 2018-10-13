

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * Servlet implementation class CreateSubQuestion
 */
@WebServlet("/CreateSubQuestion")
public class CreateSubQuestion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CreateSubQuestion() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		if (session.getAttribute("id") == null)//not logged in
		{
			response.sendRedirect("login.html");
			return;
		}
		if (!session.getAttribute("role").equals("instructor"))
		{
			response.sendRedirect("illegalAccess.html");
		}
		String question = (String) request.getParameter("question");
		String iid = (String) session.getAttribute("id");
		String answer = (String) request.getParameter("answer");
		
		String query = "insert into question(iid, problem, isobjective) values (?, ?, false)";
		boolean madeQuestion =  DbHelper.executeUpdateBool(query, new DbHelper.ParamType[] {DbHelper.ParamType.STRING,
        		DbHelper.ParamType.STRING}, new String[] {iid, question});
		
		if (!madeQuestion)
		{
			ObjectMapper mapper = new ObjectMapper();
	    	ObjectNode node = mapper.createObjectNode();
	    	node.put(DbHelper.STATUS_LABEL, false);
    		response.getWriter().print(node.toString());
    		return;
		}
		
		String query2 = "select qid from question where iid = ? and problem = ? and isobjective = false";
		List<List<Object> > quidList = DbHelper.executeQueryList(query2, new DbHelper.ParamType[] {DbHelper.ParamType.STRING,
				DbHelper.ParamType.STRING}, new String[] {iid, question});
		
		if (quidList.size() != 1 || quidList.get(0).size() != 1)
		{
			ObjectMapper mapper = new ObjectMapper();
	    	ObjectNode node = mapper.createObjectNode();
	    	node.put(DbHelper.STATUS_LABEL, false);
	    	node.put("message", "You have already created this question");
    		response.getWriter().print(node.toString());
    		System.out.println(node.toString());
    		return;
		}
		
		String qid = Integer.toString((int) quidList.get(0).get(0));
		String query3 = "insert into option values(?, true, 1, ?)";
		
		String json = DbHelper.executeUpdateJson(query3, new DbHelper.ParamType[] {DbHelper.ParamType.INT,
                DbHelper.ParamType.STRING}, new String [] {qid, answer});
		response.getWriter	().print(json);
		return;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
