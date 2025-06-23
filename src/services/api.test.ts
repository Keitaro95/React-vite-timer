// API fetch test with mock api server
import { render, screen } from "@testing-library/react";
import { GetCurrentHHMM } from "./api";
import { ENDPOINT_URL } from "../Example";
import axios from "axios";

vi.mock("axios");

it('should get current Time from outer API', async () => {
        axios.get.mockResolvedValue({
            // dataの型
            data: {
                "utc_offset": "+09:00",
                "timezone": "Asia/Tokyo",
                "day_of_week": 3,
                "day_of_year": 169,
                "datetime": "2025-06-18T17:37:20.034422+09:00",
                "utc_datetime": "2025-06-18T08:37:20.034422+00:00",
                "unixtime": 1750235840,
                "raw_offset": 32400,
                "week_number": 25,
                "dst": false,
                "abbreviation": "JST",
                "dst_offset": 0,
                "dst_from": null,
                "dst_until": null,
                "client_ip": "159.28.69.182"
              }
        });
        const currentHHMM = await getCurrentHHMM();
        expect(currentHHMM).toBe("17:37")
    })