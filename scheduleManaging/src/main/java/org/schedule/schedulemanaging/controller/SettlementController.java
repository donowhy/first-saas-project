package org.schedule.schedulemanaging.controller;

import lombok.RequiredArgsConstructor;
import org.schedule.schedulemanaging.common.response.ApiResponse;
import org.schedule.schedulemanaging.dto.settlement.SettlementResponse;
import org.schedule.schedulemanaging.service.PayrollSettlementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/settlements")
@RequiredArgsConstructor
public class SettlementController {

    private final PayrollSettlementService payrollSettlementService;

    @GetMapping("/{year}/{month}")
    public ApiResponse<List<SettlementResponse>> getMonthlySettlements(
            @PathVariable int year, 
            @PathVariable int month) {
        return ApiResponse.success(payrollSettlementService.getMonthlySettlements(year, month));
    }
}
