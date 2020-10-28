package net.ion.ice.services.ecommerce.productMng.hiddenLink;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.ion.ice.core.context.ExecuteContext;
import net.ion.ice.core.context.QueryContext;
import net.ion.ice.core.node.Node;
import net.ion.ice.core.node.NodeQuery;
import net.ion.ice.core.node.NodeService;
import net.ion.ice.core.node.NodeUtils;
import net.ion.ice.core.query.QueryResult;
import net.ion.ice.core.session.SessionHelper;
import net.ion.ice.services.ecommerce.productMng.product.KwopProductService;

/**
 * 상품 서비스
 *
 */
@Service("kwopHiddenLinkService")
public class KwopHiddenLinkService {
	private static final Logger logger = LoggerFactory.getLogger(KwopHiddenLinkService.class);

	@Autowired
	private NodeService nodeService;
	@Autowired
	private KwopProductService kwopProductService;

	final static String HIDDEN_LINK = "hiddenLink";
	final static String PRODUCT = "product";

	/**
	 * 어드민페이지에서 다중 삭제 Event Method
	 * 
	 * @param context
	 */
	public void admDelete(ExecuteContext context) {

		Map<String, Object> resultMap = new LinkedHashMap<>();

		try {
			Map<String, Object> data = context.getData();
			int deleteCnt = 0;

			String ids = MapUtils.getString(data, "ids");
			String id = MapUtils.getString(data, "id");

			if (ids != null && ids.length() > 0) {

				String idsArr[] = ids.split(",");
				for (String hiddenLinbkNo : idsArr) {
					System.out.println(hiddenLinbkNo);

					Map<String, Object> updateMap = new HashMap<>();
					updateMap.put("id", hiddenLinbkNo);
					updateMap.put("deleteYn", true);

					Node resultNode = nodeService.updateNode(updateMap, "hiddenLink");

					if (resultNode != null) {
						deleteCnt++;
					}
				}
			} else if (id != null && id.length() > 0) {
				Map<String, Object> updateMap = new HashMap<>();
				updateMap.put("id", id);
				updateMap.put("deleteYn", true);

				Node resultNode = nodeService.updateNode(updateMap, "hiddenLink");

				if (resultNode != null) {
					deleteCnt++;
				}
			}

			if (deleteCnt > 0) {
				String resultMessage = String.format("%,d개 삭제 완료하였습니다.", deleteCnt);
				logger.info("[히든링크 삭제] " + resultMessage);

				resultMap.put("result", "200");
				resultMap.put("resultMessage", resultMessage);
			} else {
				resultMap.put("result", "500");
				resultMap.put("resultMessage", "삭제되지 않았습니다. 다시 확인부탁드립니다.");
			}
			context.setResult(resultMap);
			return;

		} catch (Exception e) {
			resultMap.put("result", "501");
			resultMap.put("resultMessage", "처리 실패하였습니다. 관리자에게 문의부탁드립니다.");
			context.setResult(resultMap);
			return;
		}
	}

	/**
	 * 히든링크 상품 상세조회
	 * 
	 * @param context
	 */
	public void checkHiddenLink(ExecuteContext context) {

		Map<String, Object> resultMap = new HashMap<>();

		Map<String, Object> data = context.getData();
		String productId = MapUtils.getString(data, "productId", "-");
		Map<String, Object> sessionCustomer = SessionHelper.getCustomer();
		String customerNo = MapUtils.getString(sessionCustomer, "customerNo", "-");
		
		// 히든링크Node 조회 (상품 상세조회 가능여부 확인)
		if (!isAccess(productId, customerNo)) {
			// 히든링크와 관련없음
			resultMap.put("result", "404");
			resultMap.put("resultMessage", "Not Found");
			context.setResult(resultMap);
			return;
		}
		
		// 상품 상세조회
		QueryResult productResult = kwopProductService.customRead(customerNo, productId);
		context.setResult(productResult);
	}
	public QueryResult checkHiddenLink(String customerNo, String productId) {
		// 히든링크Node 조회 (상품 상세조회 가능여부 확인)
		if (!isAccess(productId, customerNo)) {
			// 히든링크와 관련없음
			return null;
		}
		
		// 상품 상세조회
		return readProduct(productId);
	}

	// 히든링크Node 조회 (상품 상세조회 가능여부 확인)
	public boolean isAccess(String productId, String customerNo) {
		
		Date nowDate = new Date();

		List<Map<String, Object>> hiddenLinkList = (List<Map<String, Object>>) NodeQuery.build(HIDDEN_LINK)
				.matching("deleteYn", "false")
				.matching("products", productId)
				.matching("customers", customerNo)
				.getList();
		
		// 날짜시간 확인
		for (Map<String, Object> hiddenLinkMap : hiddenLinkList) {
			Date startTime = (Date) MapUtils.getObject(hiddenLinkMap, "startTime");
			Date endTime = (Date) MapUtils.getObject(hiddenLinkMap, "endTime");
			
			if (startTime != null && endTime != null) {
				if (startTime.compareTo(nowDate) <= 0 && endTime.compareTo(nowDate) >= 0) {
					return true;
				}
			}
		}
		
		return false;
	}

	// 상품 상세조회
	private QueryResult readProduct(String productId) {
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date nowDate = new Date();
		String param = "";

		// 상품ID
		param = "productId_matching=" + productId;
		// 등록상태
		param += "&approvalStatus_matching=approval";
		// 판매상태
		param += "&saleStatus_notMatching=endSelling";
		// "미노출"
		param += "&showYn_matching=false";
		// 삭제여부
		param += "&deleteYn_matching=false";
		// 판매시작일
		param += "&saleStartDate_below=" + sdf.format(nowDate);
		// 판매종료일
		param += "&saleEndDate_above=" + sdf.format(nowDate);
		// 공급사배송정보번호
		param += "&referenceView=vendorDeliveryNo";
		// 대카테고리
//		param += "&categoryIdA_referenceJoin=useYn_matching=true";
		// 중카테고리
//		param += "&categoryIdB_referenceJoin=useYn_matching=true";
		// 소카테고리
//		param += "&categoryIdC_referenceJoin=useYn_matching=true";
		
		QueryContext queryContext = QueryContext.createQueryContextFromText(param, NodeUtils.getNodeType(PRODUCT), null);
		queryContext.makeResult();
		QueryResult productResult = queryContext.makeQueryResult();
		
		// 'items' List형식 key를 'item' Map형식 key 변경
		List<Map<String, Object>> itemsList = (List<Map<String, Object>>) MapUtils.getObject(productResult, "items");
		if (itemsList != null && itemsList.size() > 0) {
			productResult.put("item", itemsList.get(0));
			productResult.remove("items");
		}
		
		return productResult;
	}
}
